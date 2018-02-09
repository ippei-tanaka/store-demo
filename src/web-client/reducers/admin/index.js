import adminProductList from '@/web-client/reducers/admin/adminProductList';
import ui from '@/web-client/reducers/admin/ui';

export default (state = {}, action) => ({
    adminProductList: adminProductList(state.adminProductList, action),
    ui: ui(state.ui, action),
});