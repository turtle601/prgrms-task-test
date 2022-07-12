export const getRootApi = async () => {
  const rootData = await fetch(
    "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/"
  );

  return rootData.ok ? await rootData.json() : rootData.ok;
};

export const getFileApi = async (id) => {
  const fileData = await fetch(
    `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${id}`
  );

  return fileData.ok ? await fileData.json() : fileData.ok;
};
