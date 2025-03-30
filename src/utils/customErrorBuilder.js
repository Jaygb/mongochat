function getErrorMessage(error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    } else {
      return "An unknown error occurred";
    }
  }
  
  const extractErrorFromValidation = (error) => {
    return error.issues
      .map((issue) => {
        return issue.message;
      })
      .join(", ");
  };
  
  module.exports = { getErrorMessage, extractErrorFromValidation };
  