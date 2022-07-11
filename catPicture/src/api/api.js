export const getRootApi = async () => {
  const rootData = await fetch(
    "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/"
  );

  return await rootData.json();
};

export const getFileApi = async (id) => {
  const fileData = await fetch(
    `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${id}`
  );

  return await fileData.json();
};
