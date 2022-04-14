import { useRef, useState, useEffect } from 'react';
import './index.less';

const CONTAINER_HEIGHT = 600;
const list = new Array(1000)
  .fill(true)
  .map((item, index) => (item = { name: 'JAY', rank: index }));

const Scroll = ({ height = 66 }) => {
  const totalH = list.length * height + 'px';
  const [{ data, totalHeight, transform }, setData] = useState({
    data: [], // 可视区域数据
    totalHeight: totalH, // 长列表总高度 列表中每一项数据高度总和
    transform: '',
  });
  const virtualList = useRef<any>(null);

  const updateViewContent = (scrollTop = 0) => {
    // 计算可视区域里能放几个元素
    const viewCount = Math.ceil(virtualList.current.clientHeight / height);
    // 计算可视区域开始的索引
    const start = Math.floor(scrollTop / height);
    // 计算可视区域结束索引
    const end = start + viewCount;
    // 截取可视区域数据
    const viewData = list.slice(start, end);

    setData({
      data: viewData,
      transform: `translate3d(0, ${start * height}px, 0)`,
    } as any);
  };

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    updateViewContent(scrollTop);
  };

  useEffect(() => {
    updateViewContent();
  }, []);

  return (
    <div
      className="virtual-list"
      style={{ height: CONTAINER_HEIGHT }}
      onScroll={handleScroll}
      ref={virtualList}
    >
      <div className="virtual-list-height" style={{ height: totalHeight }} />
      <div className="view-content" style={{ transform: transform }}>
        {data.map(({ name, rank }, index) => (
          <div className="view-item" key={index}>
            {name + rank}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scroll;
