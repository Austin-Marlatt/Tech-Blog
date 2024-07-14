// logic for updating or deleting a blog post

// Hidden input for reference to selected blog post ID
const postId = document.querySelector('input[name="blogPost-id"]').value;

const updateBlogPost = async function (e) {
  e.preventDefault();

  // Variables used to listen to the input fields for the title and the text content of a blog post
  const title = document.querySelector('input[name="blogPost-title"]').value;
  const body = document.querySelector('textarea[name="blogPost-body"]').value;

  // PUT request wiht a request body passed in with the above variables
  await fetch(`/api/blogPosts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Redirect to the dashboard after the update
  window.location.assign('/dashboard');
};


const deleteBlogPost = async function () {
  // Delete request using the post id as a reference
  await fetch(`/api/blogPosts/${postId}`, {
    method: 'DELETE',
  });

  // Redirect to the dashboard after the update
  window.location.assign('/dashboard');
};

// Button event listeners for update form and delete request
document
  .querySelector('#update-blogPost-form')
  .addEventListener('submit', updateBlogPost);

document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteBlogPost);
