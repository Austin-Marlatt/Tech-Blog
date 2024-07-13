const newBlogPost= async function (e) {
  e.preventDefault();

  const title = document.querySelector('input[name="blogPost-title"]').value;
  const body = document.querySelector('textarea[name="blogPost-body"]').value;

  await fetch(`/api/blogPosts/newBlogPost`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  window.location.assign('/dashboard');
};

document
  .querySelector('#blogPost-form')
  .addEventListener('submit', newBlogPost);
