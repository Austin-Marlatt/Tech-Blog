const blogPostComment = async function (e) {
  e.preventDefault();

  const blogPostId = document.querySelector('input[name="blogPost-id"]').value;
  const content = document.querySelector('textarea[name="comment-content"]').value;

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

    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace("/signIn");
    }
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", blogPostComment);
