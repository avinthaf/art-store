import {useState, useEffect} from 'react'
import { collection, setDoc, getDocs, doc, query, limit } from 'firebase/firestore';
import { db } from '../../firebase';

import './Home.css'
// import mockProducts from '../../products'
// import mockCategories from '../../categories'


const Home = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
        const productsCollection = collection(db, 'products')
        const productsQuery = query(productsCollection, limit(20))
        const querySnapshot = await getDocs(productsQuery)
        const productsData = []
  
        querySnapshot.forEach((doc) => {
          productsData.push({docId: doc.id, ...doc.data()})
        })
  
        setProducts(productsData)
    }

    const fetchCategories = async () => {
        const categoriesCollection = collection(db, 'categories')
  
        try {
          const querySnapshot = await getDocs(categoriesCollection)
          const fetchedCategories = querySnapshot.docs.map((doc) => doc.data())
          setCategories(fetchedCategories)
        } catch (error) {
          console.error('Error fetching categories:', error)
        }
    }

    // const addProductsToFirestore = async (products) => {
    //     const productsCollection = collection(db, 'products');
      
    //     for (const product of products) {
    //       await setDoc(doc(productsCollection), product);
    //     }
      
    //     console.log('Products added to Firestore!');
    // };

    // const addCategoriesToFirestore = async (categories) => {
    //     const categoriesCollection = collection(db, 'categories')
      
    //     for (const category of categories) {
    //       try {
    //         await setDoc(doc(categoriesCollection, category.categoryId.toString()), category)
    //         console.log(`Category with ID ${category.categoryId} added successfully.`)
    //       } catch (error) {
    //         console.error(`Error adding category with ID ${category.categoryId}: ${error}`)
    //       }
    //     }
    // }


    fetchProducts()
    fetchCategories()
  }, [])

  return (
    <div className="Home">

      {/* Main Content Section */}
      <main>
        {/* Banner Section */}
        <section className="banner">
          {/* Add a banner image or promotional content here */}
        </section>

        {/* Featured Products Section */}
        <section className="featured-products">
            <section className="products-container">
                {products.map((product, index) => (
                    <a key={product.productId} href={`/product/${product.docId}`}>
                        <div key={index} className="featured-product">
                            <img src={product.image} alt={product.title} />
                            <span className="product-title">{product.title}</span>
                            <br/>
                            <small className="product-price">${product.price}</small>
                        </div>
                    </a>
                ))}
            </section>
        </section>
      </main>
    </div>
  )
}

export default Home