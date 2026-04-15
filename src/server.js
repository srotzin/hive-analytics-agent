'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3036;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/analytics'));
app.get('/',(_,r)=>r.json({service:'hive-analytics-agent',version:'1.0.0',description:'Ecosystem analytics — real-time metrics, trend detection, cohort analysis, predictive modeling',endpoints:{execute:'POST /v1/analytics/execute',record:'GET /v1/analytics/record/:id',stats:'GET /v1/analytics/stats',records:'GET /v1/analytics/records',health:'GET /health',pulse:'GET /.well-known/hive-pulse.json',ai:'GET /.well-known/ai.json'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-analytics-agent] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
