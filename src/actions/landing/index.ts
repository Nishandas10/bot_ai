"use server";
import axios from "axios";
import { normalizeTitle } from "@/lib/utils"; // Import the normalize function

export const onGetBlogPosts = async () => {
  try {
    const postArray: {
      id: string;
      title: string;
      image: string;
      content: string;
      createdAt: Date;
    }[] = [];
    const postsUrl = process.env.CLOUDWAYS_POSTS_URL;
    if (!postsUrl) return;
    const posts = await axios.get(postsUrl);
    const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL;
    if (!featuredImages) return;

    let i = 0;
    while (i < posts.data.length) {
      const image = await axios.get(
        `${featuredImages}/${posts.data[i].featured_media}`
      );
      if (image) {
        //we push a post object into the array
        console.log(image.data.media_details);
        const post: {
          id: string;
          title: string;
          image: string;
          content: string;
          createdAt: Date;
        } = {
          id: posts.data[i].id,
          title: posts.data[i].title.rendered,
          image: image.data.media_details.file,
          content: posts.data[i].content.rendered,
          createdAt: new Date(posts.data[i].date),
        };
        postArray.push(post);
      }
      i++;
    }

    if (posts.data) {
      return postArray;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetBlogPost = async (title: string) => {
  try {
    const postUrl = process.env.CLOUDWAYS_POSTS_URL;
    if (!postUrl) return;
    const posts = await axios.get(postUrl);
    const normalizedTitle = normalizeTitle(title); // Normalize the title
    const post = posts.data.find(
      (p: { title: { rendered: string } }) =>
        normalizeTitle(p.title.rendered) === normalizedTitle // Compare normalized titles
    );
    if (post) {
      const authorUrl = process.env.CLOUDWAYS_USERS_URL;
      if (!authorUrl) return;
      const author = await axios.get(`${authorUrl}${post.author}`);
      if (author.data) {
        return {
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          createdAt: new Date(post.date),
          author: author.data.name,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
