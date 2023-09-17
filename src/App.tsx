import React, { ReactElement, useState, useRef } from "react"


import soda500ml from '../assets/soda_500ml.webp'
import soda700ml from '../assets/soda_700ml.jpg'
import sparkWater500ml from '../assets/water_500ml.jpg'
import water500ml from '../assets/water_500ml.webp'

import popcornSmall from '../assets/popcorn_small.webp'
import popcornMedium from '../assets/popcorn_medium.webp'
import popcornLarge from '../assets/popcorn_large.jpg'

import popcornSweetSmall from '../assets/popcorn_sweet_small.jpg'
import popcornSweetMedium from '../assets/popcorn_sweet_medium.jpg'
import popcornSweetLarge from '../assets/popcorn_sweet_large.jpg'

import snackBar from '../assets/cinema_snack_bar.jpg'

type Item = {
  name: string;
  price: number;
  image: string;
}

const items: Item[] = [
  {
    name: "Refri 500ML",
    price: 10,
    image: soda500ml
  },
  {
    name: "Refri 700ML",
    price: 12,
    image: soda700ml
  },
  {
    name: "Água com gas 500ML",
    price: 8,
    image: sparkWater500ml
  },
  {
    name: "Água sem gas 500ML",
    price: 8,
    image: water500ml
  },
  {
    name: "Pipoca Salgada Pequena",
    price: 15,
    image: popcornSmall
  },
  {
    name: "Pipoca Salgada Média",
    price: 20,
    image: popcornMedium
  },
  {
    name: "Pipoca Salgada Grande",
    price: 25,
    image: popcornLarge
  },

  {
    name: "Pipoca Doce Pequena",
    price: 18,
    image: popcornSweetSmall
  },
  {
    name: "Pipoca Doce Média",
    price: 24,
    image: popcornSweetMedium
  },
  {
    name: "Pipoca Doce Grande",
    price: 30,
    image: popcornSweetLarge
  },
]

type ShopItemProps = Item & {
  onAmountChanged: (a: number) => void
};

const ShopItem = ({ name, price, image, onAmountChanged = (_) => {} }: ShopItemProps) => {
  const [amount, setAmount] = useState(0)
  return (
    <div className="border shadow-xl border-gray-50 rounded-xl space-y-3 p-4">
      <div className="items-center">
        <img src={image} alt={name}/>
      </div>
      <p>{name}</p>
      <p>R$ {price}</p>
      <input type="number" className="h-3 w-[95%]" min={0} onChange={e => {
        const value = parseInt(e.target.value)

        onAmountChanged(value)
        setAmount(value)
      }}/>

      <p>Total: R$ {price * amount}</p>

    </div>
  )
}

const ShoppingItems = () => {
  const [shoppingCart, setShoppingCart] = useState({})

  console.log("Values", Object.values(shoppingCart))
  const shoppingCartValues: number[] = Object.values(shoppingCart)

  const totalCost = shoppingCartValues.length > 0 ?
    shoppingCartValues.reduce((a,b) => a + b) :
    0;

  return (
    <div>
      <div className="grid sm:grid-cols-3 xl:grid-cols-3 gap-6">
        {
          items.map((i) => <ShopItem key={i.name} {...i} onAmountChanged={a => {
            // const shoppingCart = shoppingCart

            if (a < 1) {
              shoppingCart[i.name] = undefined
            } else {
              shoppingCart[i.name] = a * i.price
            }

            console.log("Changed", shoppingCart)
            setShoppingCart({...shoppingCart})
          }}/>)
        }
      </div>
      <div className="mt-10">
        <p>Total: R$ {totalCost}</p>
      </div>
    </div>

  )
}

function App(): ReactElement {

  return (
    <div className="m-20 p-4 space-y-6 border shadow-xl border-gray-50 rounded-xl">
      <div className="space-y-10">
        <div className="flex flex-row space-x-6 items-center">
          <img src={snackBar} alt={"Snack bar"} className="h-48 w-96"/>
          <h1 className="items-center text-blue-400 font-bold">Produtos para aproveitar enquanto assiste a um bom filme</h1>
        </div>
        <p>Aproveite para comprar suas bebidas, pipocas, petiscos e doces para saborear enquanto assiste a um filme</p>
      </div>
      <div className="pt-4">
        <ShoppingItems/>
      </div>
    </div>
  )
}

export default App
