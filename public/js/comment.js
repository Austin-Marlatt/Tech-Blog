// Logic to handle submitting cooments on a post

const blogPostComment = async function (e) {
  e.preventDefault();

  // Variables used to listen to the input fields for the blog post ID and the text content of a comment
  const blogPostId = document.querySelector('input[name="blogPost-id"]').value;
  const content = document.querySelector('textarea[name="comment-content"]').value;

  // If there is input in the text area, send a post request to comments endpoint
  if (content) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({
        blogPostId,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Reload the page if POST is successful, redirect to sign in view if not
    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace("/signIn");
    }
  }
};

// Event listener for the comment form submit button, executes function
document
  .querySelector("#comment-form")
  .addEventListener("submit", blogPostComment);
