// Logic to handle submitting cooments on a post

const blogPostComment = async function (e) {

  e.preventDefault();

  // Variables used to listen to the input fields for the blog post ID and the text content of a comment
  const blogPostId = document.querySelector('input[name="blogPost-id"]').value;

  const body = document.querySelector('textarea[name="comment-content"]').value;

  // If there is input in the text area, send a post request to comments endpoint
  await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      blogPostId,
      body,
    }),
      headers: { "Content-Type": "application/json" },
    });
  
  // reload the page after the POST
  location.reload();
};

// Event listener for the comment form submit button, executes function
document
  .querySelector("#comment-form")
  .addEventListener("submit", blogPostComment);
