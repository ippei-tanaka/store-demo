import adminProductList from '@/web-client/reducers/admin/adminProductList';

export default (state = {}, action) => ({
    adminProductList: adminProductList(state.adminProductList, action),
});