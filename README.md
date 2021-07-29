# project2-react-geomaps
Project2 React Geomaps
dynamic research and visualization of marketing awards data

project proposal: https://docs.google.com/document/d/1bZ_-ASV5XOHIX9T2MjpD1ZhVM22xmtZt-qxxWJKWmhc/edit?usp=sharing

The purpose behind this repo is to be able to publish a React geomap view for the top agencies based on the following query:

select amr.ranking_category, amr.year, amr.agency_id, amr.points, a.name, a.city
from agency_market_rank amr
join agency a on   
	a.id = amr.agency_id
where (amr.ranking_category, amr.year, amr.points) in (
select ranking_category, year,
max(points)
from agency_market_rank
group by ranking_category, year
)
order by year, ranking_category	

The resultant output is:
ranking_category	year	agency_id	points	name	                    city
creative        	2018	170	    	 786	AlmapBBDO	            Sao Paulo
effective       	2018	3263	         270	Starcom 	            Chicago
media           	2018	2124	         317	MediaCom	            London
creative        	2019	292              403	BBDO    	            New York
effective       	2019	2030             135	McCann  	            New Delhi
media           	2019	2163	         202	MediaCom Connections	    Tel Aviv
effective       	2020	998              139	FP7 McCann	            Dubai
media           	2020	3262             335	Starcom 	            Chicago

The React Simple Maps library was chosen to pull in a new library for this project  and give a visual representation for the results above.

The following links were referenced for
1.) Basics on how to get started in React
2.) Identify what modules and libraries need to be loaded
3.) How to deploy and publish the React geomap view from GitHub

References:
https://code.visualstudio.com/docs/nodejs/reactjs-tutorial
https://github.com/gitname/react-gh-pages

along with many other articles on the internet

By intention, the number of commits is low as republishing changes to this view was still a work in progress at the end of this project.
