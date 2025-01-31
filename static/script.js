// Enhanced smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Loading management
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class after a small delay to ensure styles are applied
    setTimeout(() => {
        document.body.classList.add('loaded');
        // Hide loading bar
        const loadingBar = document.querySelector('.loading-bar');
        if (loadingBar) {
            loadingBar.style.display = 'none';
        }
    }, 300); // Increased delay to ensure styles are loaded
});

// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    const mailtoLink = `mailto:howe.steve@outlook.com?subject=Portfolio Contact from ${name}&body=From: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    
    window.location.href = mailtoLink;
    this.reset();
});

async function loadBlogContent(postId) {
    console.log('Loading blog content for post ID:', postId);
    const blogContentDiv = document.getElementById('blog-content');
    if (!blogContentDiv) {
        console.error('Blog content div not found');
        return;
    }

    const content = await fetchBlogContent();
    console.log('Fetched content:', content);
    
    if (content && content[postId]) {
        const post = content[postId];
        console.log('Found post:', post);
        document.title = `${post.title} | Steve Howe`;
        blogContentDiv.innerHTML = `
            <h1>${post.title}</h1>
            ${post.content}
        `;
    } else {
        console.log('Post not found for ID:', postId);
        blogContentDiv.innerHTML = `
            <h1>Post Not Found</h1>
            <p>The blog post you are looking for does not exist. <a href="index.html">Return to home</a></p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    console.log('URL Parameter ID:', postId);
    
    if (postId) {
        await loadBlogContent(postId);
    } else {
        const blogContentDiv = document.getElementById('blog-content');
        blogContentDiv.innerHTML = `
            <h1>Welcome to My Blog</h1>
            <p>Please select a post from the <a href="index.html#blog">main page</a> to view its content.</p>
        `;
    }
});
