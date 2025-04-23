export const getBlogPostQuery = `
  query getBlogPost($handle: String!, $blogHandle: String = "news") {
    blogByHandle(handle: $blogHandle) {
      articleByHandle(handle: $handle) {
        id
        title
        handle
        content
        contentHtml
        excerpt
        excerptHtml
        publishedAt
        image {
          id
          url
          altText
          width
          height
        }
        seo {
          title
          description
        }
        tags
        author: authorV2 {
          name
          email
          bio
        }
      }
    }
  }
`;

export const getBlogPostsQuery = `
  query getBlogPosts($first: Int!, $blogHandle: String = "news") {
    blogByHandle(handle: $blogHandle) {
      articles(first: $first) {
        edges {
          node {
            id
            title
            handle
            excerpt
            excerptHtml
            publishedAt
            image {
              id
              url
              altText
              width
              height
            }
            tags
            author: authorV2 {
              name
            }
          }
        }
      }
    }
  }
`;
