/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import "@/app/styles/slt.css";
import { useEffect, useState } from 'react'
import { useCart } from '@/app/slt/components/CartProvider'
import { PageWrapper } from '../../components/PageWrapper'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fas, far, fab)
type Products = {
    id: string;
    price: string;
    desc: string;
    img: string;
}
const Menu = () => {
    const cheesecakes: Products[] = [
        {id: 'Plain Cheesecake', price: '12.99', desc: 'Graham cracker crumbs, Sugar, Melted butter, Cream cheese, Eggs, Vanilla , Heavy cream', img: '/img/slt/cheesecakes/plain-cc.jpg'},
        {id: 'Strawberry Cheesecake', price: '15.99', desc: 'Graham cracker crumbs, Sugar, Melted butter, Cream cheese, Eggs, Vanilla, Heavy cream, Fresh strawberries, Strawberry glaze', img: '/img/slt/cheesecakes/strawberry-cc.jpg'},
        {id: 'Oreo Cheesecake', price: '13.99', desc: 'Crushed Oreo cookies, Sugar, Melted butter, Cream cheese, Eggs, Vanilla, Heavy cream,  Whipped cream and Mini Oreos', img: '/img/slt/cheesecakes/oreo-cc.jpg'},
        {id: 'Pecan Cheesecake', price: '17.99', desc: 'Graham cracker or Vanilla wafer crumbs, Sugar, Melted butter, Pecans, Cream cheese, Eggs, Vanilla, Heavy cream, Brown sugar, Carmel', img: '/img/slt/cheesecakes/pecan-cc.jpg'}
    ]
    const cakes: Products[] = [
        {id: 'Vanilla Bean Cake', price: '12.99', desc: 'All-purpose flour, sugar, baking powder, salt, eggs, unsalted butter (softened) or oil, whole milk or buttermilk, vanilla extract', img: '/img/slt/cakes/vanilla-cake.jpg'},
        {id: 'Strawberry Cake', price: '15.99', desc: 'All-purpose flour, sugar, baking powder, salt, eggs, butter, buttermilk, fresh or freeze-dried strawberries, strawberry extract, pink or red food coloring', img: '/img/slt/cakes/strawberry-cake.jpg'},
        {id: 'Chocolate Cake', price: '13.99', desc: 'All-purpose flour, sugar, cocoa powder, baking powder, baking soda, salt, eggs, butter, buttermilk, hot water, vanilla extract', img: '/img/slt/cakes/chocolate-cake.jpg'},
        {id: `Carrot \n Cake`, price: '17.99', desc: 'All-purpose flour, sugar, baking powder, baking soda, salt, eggs, oil, grated carrots, cinnamon, nutmeg, vanilla extract, crushed pineapple or applesauce, chopped walnuts or pecans, raisins', img: '/img/slt/cakes/carrot-cake.jpg'}
    ]
    const cupcakes: Products[] = [
        {id: 'Vanilla Cupcake', price: '5.99', desc: 'All-purpose flour, sugar, baking powder, butter cream, salt, eggs, butter, buttermilk, vanilla extract', img: '/img/slt/cupcakes/vanilla-cupcake.jpg'},
        {id: 'Strawberry Cupcake', price: '6.49', desc: 'All-purpose flour, sugar, baking powder, butter cream salt, eggs, butter, buttermilk, fresh or freeze-dried strawberries, strawberry extract, pink or red food coloring', img: '/img/slt/cupcakes/strawberry-cupcake.jpg'},
        {id: 'Chocolate Cupcake', price: '6.49', desc: 'All-purpose flour, sugar, cocoa powder, butter cream, baking powder, baking soda, salt, eggs, butter, buttermilk, hot water, vanilla extract', img: '/img/slt/cupcakes/chocolate-cupcake.jpg'},
        {id: 'Oreo Cupcake', price: '7.99', desc: 'All-purpose flour, sugar, crushed oreos, baking powder, butter cream, salt, eggs, butter, buttermilk, vanilla extract', img: '/img/slt/cupcakes/oreo-cupcake.jpg'}
    ]
    const jellos: Products[] = [
        {id: 'Mango \n Jello', price: '8.99', desc: 'Mango puree, mango chunks, sugar, unflavored gelatin , water, lemon or lime juice', img: '/img/slt/jellos/mango-jello.jpg'},
        {id: 'Strawbery Jello', price: '7.49', desc: 'Fresh or frozen strawberries, sugar, unflavored gelatin, water, lemon juice', img: '/img/slt/jellos/strawberry-jello.jpg'},
        {id: 'Bluebery Jello', price: '6.99', desc: 'Fresh or frozen blueberries, sugar, unflavored gelatin, water, lemon juice', img: '/img/slt/jellos/blueberry-jello.jpg'},
        {id: 'Grape \n Jello', price: '6.49', desc: 'Grape juice, grape slices, sugar, unflavored gelatin, lemon juice', img: '/img/slt/jellos/grape-jello.jpg'}
    ]
    
    const [flip, setFlip] = useState<string | null>(null)
    const { state } = useCart();
    const { dispatch } = useCart();

    const handleAddItem = (product: Products) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        console.log("Object: ",state.items)
    }
    const handleFlip = (id: string) => {setFlip(flip === id ? null : id)}

    useEffect(() => {document.title = 'Sweet Little Things - Menu'})
    return(
        <PageWrapper>
            <main>
                <aside className='slt-aside'>
                    <ul>
                        <li><Link href="#cheesecakes">Cheesecakes</Link></li>
                        <li><Link href="#cakes">Cakes</Link></li>
                        <li><Link href="#cupcakes">Cupcakes</Link></li>
                        <li><Link href="#jellos">Jellos</Link></li>
                    </ul>
                </aside>
                <section id='cheesecakes' className='slt-section'>
                    <div className="slt-section-title2  ">Cheesecakes</div>
                    <div className="products">
                    {cheesecakes.map((cc, index) => (
                        <div key={index} className={` ${index % 2 === 0 ? 'product' : 'product2'} ${index === 2 ? 'third' : ''} slt-flip-card ${flip === cc.id ? 'flip' : ''}`}>
                            <div className="slt-flip-card-inner">
                                <div className="slt-flip-card-front">
                                    <img src={cc.img} alt={cc.id} />
                                    <p>{cc.id}<br/>${cc.price}</p>
                                    <div className='product-btn-container'>
                                        <button onClick={() => handleFlip(cc.id)}>Ingredrients</button>
                                        <button onClick={() => handleAddItem(cc)}>Add to Cart</button>
                                    </div>
                                </div>
                                <div className="slt-flip-card-back">
                                    {cc.desc}
                                    <span onClick={() => handleFlip(cc.id)}><FontAwesomeIcon icon={"fa-solid fa-xmark" as IconProp} size='xl'/></span>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
                <section id='cakes' className='slt-section slt-secondary-bg'>
                    <div className="slt-section-title">Cakes</div>
                    <div className="products">
                    {cakes.map((cake, index) => (
                        <div key={index} className={` ${index % 2 === 0 ? 'product' : 'product2'} ${index === 2 ? 'third' : ''} slt-flip-card ${flip === cake.id ? 'flip' : ''}`}>
                            <div className="slt-flip-card-inner">
                                <div className="slt-flip-card-front">
                                    <img src={cake.img} alt={cake.id} />
                                    <p style={cake.id.includes('Carrot') ? {whiteSpace: 'pre-line'} : {}}>{cake.id}<br/>${cake.price}</p>
                                    <div className='product-btn-container'>
                                        <button onClick={() => handleFlip(cake.id)}>Ingredrients</button>
                                        <button onClick={() => handleAddItem(cake)}>Add to Cart</button>
                                    </div>
                                </div>
                                <div className="slt-flip-card-back">
                                    {cake.desc}
                                    <span onClick={() => handleFlip(cake.id)}><FontAwesomeIcon icon={"fa-solid fa-xmark" as IconProp} size='xl'/></span>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
                <section id='cupcakes' className='slt-section'>
                    <div className="slt-section-title2">Cupcakes</div>
                    <div className="products">
                    {cupcakes.map((cup, index) => (
                        <div key={index} className={` ${index % 2 === 0 ? 'product' : 'product2'} ${index === 2 ? 'third' : ''} slt-flip-card ${flip === cup.id ? 'flip' : ''}`}>
                            <div className="slt-flip-card-inner">
                                <div className="slt-flip-card-front">
                                    <img src={cup.img} alt={cup.id} />
                                    <p>{cup.id}<br/>${cup.price}</p>
                                    <div className='product-btn-container'>
                                        <button onClick={() => handleFlip(cup.id)}>Ingredrients</button>
                                        <button onClick={() => handleAddItem(cup)}>Add to Cart</button>
                                    </div>
                                </div>
                                <div className="slt-flip-card-back">
                                    {cup.desc}
                                    <span onClick={() => handleFlip(cup.id)}><FontAwesomeIcon icon={"fa-solid fa-xmark" as IconProp} size='xl'/></span>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
                <section id='jellos' className='slt-section slt-secondary-bg'>
                    <div className="slt-section-title">Jellos</div>
                    <div className="products">
                    {jellos.map((jello, index) => (
                        <div key={index} className={` ${index % 2 === 0 ? 'product' : 'product2'} ${index === 2 ? 'third' : ''} slt-flip-card ${flip === jello.id ? 'flip' : ''}`}>
                            <div className="slt-flip-card-inner">
                                <div className="slt-flip-card-front">
                                    <img src={jello.img} alt={jello.id} />
                                    <p>{jello.id}<br/>${jello.price}</p>
                                    <div className='product-btn-container'>
                                        <button onClick={() => handleFlip(jello.id)}>Ingredrients</button>
                                        <button onClick={() => handleAddItem(jello)}>Add to Cart</button>
                                    </div>
                                </div>
                                <div className="slt-flip-card-back">
                                    {jello.desc}
                                    <span onClick={() => handleFlip(jello.id)}><FontAwesomeIcon icon={"fa-solid fa-xmark" as IconProp} size='xl'/></span>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
            </main>
        </PageWrapper>
    )
}
export default Menu