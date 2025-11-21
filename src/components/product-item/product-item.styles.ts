import styled from 'styled-components';

interface ProductImageProps {
  $imageUrl: string;
}

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;

  p {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const ProductImage = styled.div<ProductImageProps>`
  background-image: ${(props) => `url('${props.$imageUrl}')`};
  height: 250px;
  width: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
