'use client'

import { motion, useCycle } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import mpegtsJs from 'mpegts.js';

const localIp = '172.19.187.73';

export default function LiveItem({
  stream
}: {
  stream: {
    username: string,
    sourceIp: string,
    No: number
  }
}) {
  const streamAddr = "rtmp://" + localIp + ":1935/live/" + stream.No;
  const videoAddr = "http://" + localIp + "/live?app=live&stream=" + stream.No;

  const [isOpen, setIsOpen] = useCycle(false, true);

  const handleHeadCilcked = () => {
    setIsOpen();
  }

  const streamDetail = {
    open: {
      height: "100%",
      opacity: 1,
      transition: {
        type: "ease",
      },
    },
    closed: {
      height: "0",
      opacity: 0,
      transition: {
        type: "ease"
      },
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const mpegtsRef = useRef<mpegtsJs.Player>();
  useEffect(() => {
    if (mpegtsJs.isSupported()) {
      mpegtsRef.current = mpegtsJs.createPlayer({
        type: 'mpegts',
        isLive: true,
        cors: true,
        hasAudio: true,
        hasVideo: true,
        url: videoAddr,
      });
      if (videoRef.current) {
        mpegtsRef.current.attachMediaElement(videoRef.current);
        mpegtsRef.current.load();
      }
    if (videoRef.current && mpegtsRef.current) {
      mpegtsRef.current.attachMediaElement(videoRef.current);
      mpegtsRef.current.load();
    }
    }
  }, [])
  const [isPlay, setIsPlay] = useState(false);
  const handleVideoClicked = useCallback(() => {
    if (mpegtsRef.current) {
       if (isPlay) {
         mpegtsRef.current.pause();
       } else {
         mpegtsRef.current.play();
       }
      setIsPlay(!isPlay);
    }
  }, [isPlay]);



  return (
    <motion.div className="LiveItem mx-1 p-1 text-stone-700 rounded-lg text-sm
      transition-all delay-75
      hover:bg-stone-200
      sm:p-2"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >

      <div className="LiveItemHead flex" onClick={handleHeadCilcked}>
        <div className="text-md flex-auto">
          <p className="cursor-default">拉流{' ' + streamAddr}</p>
          <span className="cursor-default hover:text-stone-800">浏览器{' '}</span><a href=''><span className="rounded-md hover:bg-stone-400 hover:text-slate-800">{videoAddr}</span></a>
        </div>
        <div className="flex-auto w-8 h-8 justify-self-center align-middle text-center self-center rounded-full cursor-pointer text-xs
          transition-all delay-75
          hover:bg-stone-400 hover:text-stone-800
          "><p className="">查看</p><p>{isOpen ? "简略" : "详细"}</p></div>
      </div>

      <motion.div
        variants={streamDetail}
        className="overflow-hidden"
      >
        <div className="p-2 flex space-x-5">
          <span className="flex-1 transition-all delay-75 text-gray-500 hover:text-gray-800">
            <p className="text-xs cursor-default">开播用户</p>
            <p>{stream.username}</p>
          </span>
          <span className="flex-1 transition-all delay-75 text-gray-500 hover:text-gray-800">
            <p className="text-xs cursor-default">流源IP</p>
            <p>{stream.sourceIp}</p>
          </span>
          <span className="flex-1 h-full pl-3 justify-self-center align-middle text-center self-center place-self-end text-gray-400 cursor-pointer
            transition-all delay-75
            hover:text-gray-800">
            <a href='feedback'>举报</a>
          </span>
        </div>

        <div className='max-w-xl py-3 px-2'>
          <video title="首次播放会有卡顿（5s），请耐心等待" ref={videoRef} onClick={handleVideoClicked}></video>
        </div>
      </motion.div>
    </motion.div >
  )
}
