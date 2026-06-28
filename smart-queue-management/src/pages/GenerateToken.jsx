import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TokenForm from "../components/TokenForm";

function GenerateToken(){

return(

<div className="layout">

<Sidebar/>

<div className="main">

<Navbar/>

<div className="content">

<h1 style={{marginBottom:"25px"}}>

Generate Queue Token

</h1>

<TokenForm/>

</div>

</div>

</div>

)

}

export default GenerateToken;