import React, {FC, ReactNode} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import {showConfirmLogoutModal} from 'store'
import {State} from 'globalInterfaces'
import {ConfirmLogoutModal} from 'components'
import {logoutIcon} from 'assets'

import {
  CartImg,
  CartWrapper,
  Header,
  HeaderWrapper,
  Logo,
  LogoutButton,
  LogoutImg,
  LogoWrapper,
  MiniScreensLogo,
  MiniScreensLogoWrapper,
  ProfileLogoutCartWrapper,
  ProfileLogoutWrapper,
  PurchasesAmount,
  PurchasesAmountWrapper,
  UserAvatar,
  UserName
} from './style'

const HeaderLayout: FC<{children: ReactNode}> = ({children}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const {totalCount} = useSelector((state: State) => state.cart)
  const activeUserBeforeParse = localStorage.getItem('activeUser')
  const activeUser = activeUserBeforeParse ? JSON.parse(activeUserBeforeParse) : false

  const goToCartPageHandler = () => {
    if (location.pathname !== '/cart') {
      history.push('/cart')
    }
  }

  const goToCatalogPageHandler = () => {
    if (location.pathname !== '/catalog') {
      history.push('/catalog')
    }
  }

  return (
    <>
      <HeaderWrapper>
        <Header>
          <LogoWrapper>
            <Logo onClick={goToCatalogPageHandler}>
              JS Band Store
            </Logo>
          </LogoWrapper>
          <ProfileLogoutCartWrapper>
            <ProfileLogoutWrapper>
              <LogoutButton onClick={() => dispatch(showConfirmLogoutModal())}>
                <LogoutImg src={logoutIcon} />
              </LogoutButton>
              <UserName>{activeUser.name}</UserName>
              <UserAvatar src={activeUser.avatar} />
            </ProfileLogoutWrapper>
            <CartWrapper>
              <CartImg
                fill="#fff"
                onClick={goToCartPageHandler} />
              <PurchasesAmountWrapper onClick={goToCartPageHandler}>
                <PurchasesAmount>
                  {totalCount > 9 ? '9+' : totalCount}
                </PurchasesAmount>
              </PurchasesAmountWrapper>
            </CartWrapper>
          </ProfileLogoutCartWrapper>
        </Header>
      </HeaderWrapper>
      <MiniScreensLogoWrapper>
        <MiniScreensLogo onClick={goToCatalogPageHandler}>
          JS Band Store
        </MiniScreensLogo>
      </MiniScreensLogoWrapper>
      <ConfirmLogoutModal />
      {children}
    </>
  )
}

export default HeaderLayout