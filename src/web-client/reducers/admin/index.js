import adminProductList from '@/web-client/reducers/admin/adminProductList';
import adminOrderList from '@/web-client/reducers/admin/adminOrderList';
import adminUserList from '@/web-client/reducers/admin/adminUserList';
import adminMediumList from '@/web-client/reducers/admin/adminMediumList';
import ui from '@/web-client/reducers/admin/ui';

export default (state = {}, action) => ({
    adminProductList: adminProductList(state.adminProductList, action),
    adminOrderList: adminOrderList(state.adminOrderList, action),
    adminUserList: adminUserList(state.adminUserList, action),
    adminMediumList: adminMediumList(state.adminMediumList, action),
    ui: ui(state.ui, action),
});