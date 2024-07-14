// Logic for Creating anew blog post 

const newBlogPost= async function (e) {
  e.preventDefault();

  // Variables used to listen to the input fields for the title and the text content of a new blog post
  const title = document.querySelector('input[name="blogPost-title"]').value;
  const body = document.querySelector('textarea[name="blogPost-body"]').value;

  // Post request with the new post's title and body passed in the request body
  await fetch(`/api/blogPosts/newBlogPost`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Redirect to the dashboard after the update
  window.location.assign('/dashboard');
};

// Button event listener for the new blog post form, 
document
  .querySelector('#blogPost-form')
  .addEventListener('submit', newBlogPost);
