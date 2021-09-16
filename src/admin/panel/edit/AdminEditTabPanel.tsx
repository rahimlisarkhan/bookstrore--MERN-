
const AdminPanelTabPanel = ({ tabIndex, setTabIndex }) => {


    return (
        <div className="tab-content">
            <div className="tab-list">
                <div className={`tab-list__item ${tabIndex === 1 && 'active-tab'}`} onClick={() => setTabIndex(1)}>
                    Users
                </div>
                <div className={`tab-list__item ${tabIndex === 2 && 'active-tab'}`} onClick={() => setTabIndex(2)}>
                    Products
                </div>
            </div>
            <div className="tab-add">
                <button>Product Add</button>
            </div >


        </div >
    )
}

export default AdminPanelTabPanel