export default async function getProductById(id) {

    const res = await fetch(`http://localhost:5000/product/${id}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}