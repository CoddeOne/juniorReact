import { gql } from "@apollo/client"
export const GET_CATEGORIES = gql`
query Categories {
  categories {
    name
  }
}
`
export const GET_CURRENCiES = gql`
query Categories {
  currencies {
    label
    symbol
  }
}
`
export const GET_ALL_PRODUCT = gql`
query Category {
  category {
    name
    products {
      id
      name
      inStock
      gallery
      category
      brand
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}
`
export const GET_ID = gql`
query Categories($productId: String!) {
  product(id: $productId) {
    name
    inStock
    gallery
    category
    description
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}
`