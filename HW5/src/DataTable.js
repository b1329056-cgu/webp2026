<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>React DataGrid</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">

<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

<script src="https://unpkg.com/@mui/material@5/umd/material-ui.development.js"></script>
<script src="https://unpkg.com/@mui/x-data-grid@6.19.4/DataGrid/DataGrid.js"></script>

<style>
body{padding:20px;}
h1{margin-bottom:20px;}
</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">

const{useState, useEffect}=React;
const{DataGrid}=MaterialUIGrid;
const App=()=>{
    const[rows, setRows]=useState([]);
    const[search, setSearch]=useState("");
    useEffect(()=>{
        fetch("https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6")
            .then(res => res.json())
            .then(data => {
                const newRows = data.map((item, index) => ({
                    id: index + 1,
                    title: item.title,
                    location:
                        item.showInfo && item.showInfo.length>0 ? item.showInfo[0].location: "無資料",
                    price:
                        item.showInfo && item.showInfo.length>0 ? item.showInfo[0].price: "無資料"
                }));
                setRows(newRows);
            });
    }, []);
    const columns = [
        {
            field: 'title',
            headerName: '名稱',
            width: 400
        },
        {
            field: 'location',
            headerName: '地點',
            width: 350
        },
        {
            field: 'price',
            headerName: '票價',
            width: 200
        }
    ];
    const filteredRows=rows.filter(row=>
        row.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1>景點觀光展覽資訊</h1>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="輸入名稱搜尋"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

</script>
</body>
</html>
