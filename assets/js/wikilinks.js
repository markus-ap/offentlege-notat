// Wikilinks support for Obsidian-style linking
document.addEventListener('DOMContentLoaded', function() {
    // Convert [[Page Name]] patterns to actual links
    function processWikilinks() {
        const textNodes = [];
        const walker = document.createTreeWalker(
            document.querySelector('.note-content') || document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.parentNode.tagName !== 'CODE' && 
                node.parentNode.tagName !== 'PRE' &&
                node.textContent.includes('[[')) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(function(textNode) {
            const text = textNode.textContent;
            const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
            
            if (wikilinkRegex.test(text)) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                let match;
                
                wikilinkRegex.lastIndex = 0; // Reset regex
                
                while ((match = wikilinkRegex.exec(text)) !== null) {
                    // Add text before the match
                    if (match.index > lastIndex) {
                        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
                    }
                    
                    // Create the wikilink
                    const linkText = match[1];
                    const link = document.createElement('a');
                    link.textContent = linkText;
                    link.className = 'wikilink';
                    
                    // Convert to URL-friendly format
                    const urlPath = linkText.toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9\-]/g, '');
                    
                    link.href = `/notes/${urlPath}/`;
                    
                    // Check if the link exists (simplified check)
                    link.addEventListener('click', function(e) {
                        // This would be enhanced with actual link checking
                        // For now, we'll style broken links with CSS
                    });
                    
                    fragment.appendChild(link);
                    lastIndex = wikilinkRegex.lastIndex;
                }
                
                // Add remaining text
                if (lastIndex < text.length) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
                }
                
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
    }

    // Process existing wikilinks on page load
    processWikilinks();

    // Add tag click handling
    document.querySelectorAll('.tag').forEach(function(tag) {
        tag.addEventListener('click', function(e) {
            // Optional: Add analytics or other tag click handling
        });
    });

    // Add search functionality (basic implementation)
    function addSearchFeature() {
        const searchContainer = document.querySelector('.site-nav .trigger');
        if (searchContainer) {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search notes...';
            searchInput.className = 'search-input';
            searchInput.style.cssText = `
                margin-left: 1rem;
                padding: 0.25rem 0.5rem;
                border: 1px solid #e1e4e8;
                border-radius: 3px;
                font-size: 0.9rem;
            `;

            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                // This would be enhanced with actual search functionality
                // For now, we'll just highlight the search term
                console.log('Searching for:', searchTerm);
            });

            searchContainer.appendChild(searchInput);
        }
    }

    // Add search feature
    addSearchFeature();

    // Handle Mermaid diagrams
    if (typeof mermaid !== 'undefined') {
        // Mermaid is already initialized in the layout
        // This ensures it processes any dynamically added content
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    }
});