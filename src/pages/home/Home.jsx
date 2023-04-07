import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  const [userState, setUserState] = useState([]);

  const MONTHS = useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  []
  );

  useEffect(()=>{
    const getStatus = async ()=>{
      try{
       const res = await userRequest.get("/users/stats");
       res.data.map(item=>
        setUserState(prev=>[
          ...prev, { name:MONTHS[item._id-1], "Active User": item.total,}
        ])
       )
      }
      catch{}

      
    }
    getStatus()
  },[MONTHS]);

 

  return (
    <>
      <Topbar />
      <div className="container">
      <Sidebar /> 
      <div className="home">
        <FeaturedInfo />
        <Chart data={userState} title="User Analytics" grid dataKey="Active User"/>
        <div className="homeWidgets">
          <WidgetSm/>
          <WidgetLg/>
        </div>
      </div>
    </div>
    </>
   
  );
}
