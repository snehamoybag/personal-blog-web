const getEditorUrl = () => {
  const url = import.meta.env.VITE_EDITOR_URL as unknown;

  if (!url) {
    throw new Error("Editor url not found in enviroment variables.");
  }

  if (typeof url !== "string") {
    throw new Error("Editor url must be of type string.");
  }

  return url;
};

export default getEditorUrl;
