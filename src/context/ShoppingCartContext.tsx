import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
  children: ReactNode
}
type CartItem = {
  id: number
  quantity: number
}
type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

  const cartQuantity = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    const item = cartItems.find((item: CartItem) => item.id === id)
    return item?.quantity ?? 0
  }

  function increaseCartQuantity(id: number) {
    const item = cartItems.find((item: CartItem) => item.id === id)
    if (item) {
      item.quantity++
      setCartItems([...cartItems])
    } else {
      setCartItems([...cartItems, { id, quantity: 1 }])
    }
  }

  function decreaseCartQuantity(id: number) {
    const item = cartItems.find((item: CartItem) => item.id === id)
    if (item) {
      item.quantity--
      if (item.quantity === 0) {
        removeFromCart(id)
      } else {
        setCartItems([...cartItems])
      }
    }
  }

  function removeFromCart(id: number) {
    setCartItems(cartItems.filter((item: CartItem) => item.id !== id))
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
