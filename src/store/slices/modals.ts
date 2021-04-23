import {createSlice} from '@reduxjs/toolkit'

export const modals = createSlice({
  name: 'modals',
  initialState: {
    isConfirmLogoutModalVisible: false,
    isConfirmClearCartModalVisible: false,
    isAddedBookToCartModalVisible: false,
    isPurchaseModalVisible: false
  },
  reducers: {
    showConfirmLogoutModal: (state) => {
      state.isConfirmLogoutModalVisible = true
    },
    hideConfirmLogoutModal: (state) => {
      state.isConfirmLogoutModalVisible = false
    },
    showConfirmClearCartModal: (state) => {
      state.isConfirmClearCartModalVisible = true
    },
    hideConfirmClearCartModal: (state) => {
      state.isConfirmClearCartModalVisible = false
    },
    showAddedBookToCartModal: (state) => {
      state.isAddedBookToCartModalVisible = true
    },
    hideAddedBookToCartModal: (state) => {
      state.isAddedBookToCartModalVisible = false
    },
    showPurchaseModal: (state) => {
      state.isPurchaseModalVisible = true
    },
    hidePurchaseModal: (state) => {
      state.isPurchaseModalVisible = false
    }
  }
})

export const {
  showConfirmLogoutModal,
  hideConfirmLogoutModal,
  showConfirmClearCartModal,
  hideConfirmClearCartModal,
  showAddedBookToCartModal,
  hideAddedBookToCartModal,
  showPurchaseModal,
  hidePurchaseModal
} = modals.actions