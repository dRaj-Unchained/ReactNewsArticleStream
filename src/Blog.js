import React, { useEffect, useState, Children } from 'react';
import logo from './logo.svg';
import parse from 'html-react-parser';
import { Card,Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import NewsTab from '../src/Tabs';
import SubscriptionCard from '../src/Subscription'
import _ from 'underscore';
import './App.css';
import sp from './speech2.mp3';

const AWS = require('aws-sdk')
const Fs = require('fs')
// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
});
const articleTextjp = `UK banks' COVID-19 loan losses likely to be under £80B, says BoE EXCLUSIVE

Friday, August 7, 2020 9:24 AM ET

By  Jon Rees and Rehan Ahmad

Market Intelligence

The Bank of England has revised downwards its estimate of future COVID-19-connected losses for U.K. banks, saying their capital buffers are robust enough to allow them to keep lending to the real economy.

Despite British lenders reporting an additional £18 billion of credit losses on outstanding loans in the first half of 2020, the BoE revised its future aggregate loss estimate to "somewhat less than £80 billion" on the back of more-benign GDP predictions from its monetary policy committee.

Banks have set aside billions for expected losses as a result of the pandemic, with some increasing provisions in the second quarter.

Lloyds Banking Group PLC swung to a first-half loss after setting aside a larger-than-expected £2.4 billion second-quarter loan loss provision — much higher than the first-quarter provision of £1.4 billion. It estimated that the impact of the pandemic lockdown was more significant than previously forecast.

HSBC Holdings PLC, for instance, increased its scope for full-year expected credit losses to between $8 billion and $13 billion, up from between $7 billion and $11 billion, which it had predicted in April.
 



This article was published by S&P Global Market Intelligence and not by S&P Global Ratings, which is a separately managed division of S&P Global.`;
let params = {
  'Text': articleTextjp,
  'OutputFormat': 'mp3',
  // 'VoiceId': 'Aditi',
  'VoiceId': 'Mizuki',
  
  // 'Engine':'neural',
  'LanguageCode':'ja-JP'
  // 'LanguageCode':'hi-IN'
};


function Blog(props) {

  const target1 = React.createRef();
  const target2 = React.createRef();
  const target3 = React.createRef();
  const target4 = React.createRef();
  const target5 = React.createRef();

  const [subscribe,setSubscribe] = useState(false);
  const {data,subscriptiondata} = props


  const ReadingProgress = ({ target }) => {
    const [readingProgress, setReadingProgress] = useState(0);

    const scrollListener = () => {
      if (!target.current) {
        return;
      }

      const element = target.current;
      const totalHeight = element.clientHeight;// - element.offsetTop - (window.innerHeight);
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (element.offsetTop + totalHeight + 5 < windowScrollTop + window.innerHeight || element.offsetTop > windowScrollTop + window.innerHeight) {
        return setReadingProgress(0);
      }

      // if (windowScrollTop > element.offsetTop + totalHeight - (window.innerHeight) ) {
      //   return setReadingProgress(0);
      // }

      setReadingProgress(((windowScrollTop + window.innerHeight - element.offsetTop) / totalHeight) * 100);
    };
    const lazyscrollListener = _.debounce(scrollListener, 10);

    useEffect(() => {
      scrollListener();

      
// Polly.synthesizeSpeech(params, (err, data) => {
//   if (err) {
//       console.log(err.code)
//   } else if (data) {
//       if (data.AudioStream instanceof Buffer) {



//           Fs.writeFile("./speech.mp3", data.AudioStream, function(err) {
//               if (err) {
//                   return console.log(err)
//               }
//               console.log(data.AudioStream)
//               console.log("The file was saved!")
//           });
//       }
//   }
// });

      window.addEventListener("scroll", scrollListener);
      return () => window.removeEventListener("scroll", scrollListener);
    });
    if(readingProgress!==0)
    {
      window.history.replaceState({}, window.document.title, window.document.location.origin + window.document.location.pathname + '?articleId=' + target.current.getAttribute('articleid'));

    }
    return <>
      {readingProgress !== 0 && <span className="reading-progress-bar-border"></span>}
      <div className={`reading-progress-bar`} style={{ width: `${readingProgress}%` }} >
      </div>

    </>;
  };
  const handleClick = (target) => {
    // window.scrollTo(0, target.current.offsetTop); 
    window.scrollTo({
      top: target.current.offsetTop ,
      left: 0,
      behavior: 'smooth'
    });
  };
  // const ArticleFooter = () => {
  //   return (<Tabs className="article-footer" defaultActiveKey="1" >
  //     <TabPane tab="Tab 1" key="1">
  //     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum    </TabPane>
  //     <TabPane tab="Tab 2" key="2">
  //     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
  //   </TabPane>
  //     <TabPane tab="Tab 3" key="3">
  //     At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga
  //   </TabPane>
  //   </Tabs>);
  // };
  // const SubscribeBox = (props) => {
  //   return (  <Card title="Subscribe to our newsletter" className="subscribe-box"  style={{ width: props.width }}>
  //             <Button type="primary"  icon={<InboxOutlined />}>Subscribe </Button>

  // </Card>);
  // };
  let blogContent = [];
  let blogList = [];
  _.each(data, (article, i) => {
    let target = React.createRef();
    blogContent.push(<div key={i} articleid={article.id} ref={target}>
      <audio controls style={{height: "20px"}}>
                    <source src={sp} type="audio/mpeg"/>
                  Your browser does not support the audio element.
                  </audio>
      {parse(article.content)}
      <NewsTab width="734px"/>
      <SubscriptionCard width="734px" setSubscribe={setSubscribe} subscribe={subscribe} data={props.subscriptiondata}/>
      <br></br>
      <div className="article-separator"></div>
    </div>);
    blogList.push(<ul key={i} id="tocify-header0" className="tocify-header">
      <li className="tocify-item tocify-focus" onClick={() => handleClick(target)} data-unique="prerequisites" style={{ cursor: "pointer" }}>
        <h8>{parse(article.source)}</h8>
        <p>{article.title}</p>
        <h8>{article.subTitle}</h8>
        <ReadingProgress target={target} />
      </li>
    </ul>);
  });
  return (
    <>

      <div className="table-of-contents has-init sticky" >
        <div className="tocify">
          {blogList}
        </div>
        {<SubscriptionCard width="241px" setSubscribe={setSubscribe} subscribe={subscribe} data={subscriptiondata}/>}
      </div>
      {blogContent}

    </>
  );
}

export default Blog;
