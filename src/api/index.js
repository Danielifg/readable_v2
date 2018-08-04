
import uuid from 'uuid'

 const api = "http://localhost:3001";
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}


export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
/**
 * POSTS
 */
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts =>  posts.filter(post => !post.deleted))


export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
      .then(res => res.json())

//********************************** */

export const createPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
              body: JSON.stringify({
                  ...post,
                  id: uuid(),
                  timestamp: Date.now()
              })
          }).then(res => res.json())

//********************************** */        

export const editPost = ({id, title, body}) =>
  fetch(`${api}/posts/${id}`, {
      method: 'PUT',
        headers,
        body: JSON.stringify({
            title,
            body,
            timestamp: Date.now()
          })
   }).then(res => res.json())

export const deletePost = (id) =>
   fetch(`${api}/posts/${id}`, {
       method: 'DELETE',
       headers
   })

export const getPost = (id) =>
          fetch(`${api}/posts/${id}`, { headers })
              .then(res => res.json())

export const votePost = (id, option) =>
    fetch(`${api}/posts/${id}`, {
           method: 'POST',
            headers: {
                 ...headers,
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            option
           })
        }).then(res => res.json())


/**
 *  COMMENTS
*/


/**
 * Retrieve comments of single
 * "comments.js/get"
 */
export const getCommentsByPostId = (id) =>
fetch(`${api}/posts/${id}/comments`, {headers})
 .then(res => res.json())


export const getCommentByCommentId = (id) =>
 fetch(`${api}/comments/${id}`, {headers})
 .then(res => res.json())


/**
*  Retrive comment by Parent Id
*   "comments.js/getByParent"
*/
export const getCommentByParent = (parentId) =>
fetch(`${api}/parentId`, {
 method: 'POST',
    headers,
 body: JSON.stringify({
   parentId
 })
}).then(res => res.json())

/**
* Add comment to db[]
* "comments.js/add"
*/

export const createComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            ...comment,
            id: uuid(),
            timestamp: Date.now()
        })
    }).then(res => res.json())

export const voteComment = (id, option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option
        })
    }).then(res => res.json())


export const disableByParent = (post) =>
fetch(`${api}/${post}`, {
 method: 'PUT',
 headers,
 body: JSON.stringify({
   post
 })
}).then(res => res.json())

export const editComment = (id, body) =>
   fetch(`${api}/comments/${id}`, {
       method: 'PUT',
       headers,
       body: JSON.stringify({
           body,
           timestamp: Date.now()
       })
   }).then(res => res.json())

export const deleteComment = (id) =>
   fetch(`${api}/comments/${id}`, {
       method: 'DELETE',
       headers
   })
