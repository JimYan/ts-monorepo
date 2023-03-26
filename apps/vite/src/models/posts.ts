export const getPostList = async () => {
  const info = await fetch("http://127.0.0.1:3000/posts");
  //   console.log(await info.json());

  return (await info.json()) as unknown as Array<{ title: string }>;
};

export const getCommentList = async (url: string) => {
  const info = await fetch("http://127.0.0.1:3000/comments");
  //   console.log(await info.json());
  console.log(url);

  return (await info.json()) as unknown as Array<{
    body: string;
    id: number;
    postId: number;
  }>;
};
