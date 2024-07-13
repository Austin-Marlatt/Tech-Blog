const postId = document.querySelector('input[name="blogPost-id"]').value;

const updateBlogPost = async function (e) {
  e.preventDefault();

  const title = document.querySelector('input[name="blogPost-title"]').value;
  const body = document.querySelector('textarea[name="blogPost-body"]').value;

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

  document.location.replace('/dashboard');
};

const deleteBlogPost = async function () {
  await fetch(`/api/blogPosts/${postId}`, {
    method: 'DELETE',
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#update-blogPost-form')
  .addEventListener('submit', updateBlogPost);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteBlogPost);
