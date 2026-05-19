import { useEffect, useState } from 'react';
import CircularGallery from './CircularGallery.jsx';
import ChromaGrid from './ChromaGrid.jsx';
import Silk from './Silk.jsx';
import SplitText from './SplitText.jsx';
import WorkflowChromaGrid from './WorkflowChromaGrid.jsx';

const views = ['home', 'models', 'workflow', 'consulting'];

const infoLinks = {
  design01:
    'https://www.xiaohongshu.com/explore/68a26d60000000001c004823?xsec_token=ABm6H3cYTLI98BOMDNMvWkpYsZoiBG3RbxpRTcg2AzY5s=&xsec_source=pc_user',
  design02:
    'https://www.xiaohongshu.com/explore/67752cfc00000000140247eb?xsec_token=ABkpiR5X96XTXOfYiOBr6pjc1BXqwCiV3DvIQeh5JtDWw=&xsec_source=pc_user',
  design03:
    'https://www.xiaohongshu.com/explore/69f6a15f000000001e00d905?xsec_token=ABPjGvBHlNPR7_pTVUC_KSEybqpJxMO1QmmYKA3KSRtqk=&xsec_source=pc_user',
  design04:
    'https://www.xiaohongshu.com/explore/68e3ac93000000004014e86?xsec_token=ABczUM05LVksG2CPd3WOJlORX39IB6ZIe_bEu9pK1NQ4Q=&xsec_source=pc_user',
  design05:
    'https://www.xiaohongshu.com/explore/68df4c3e0000000050385d8?xsec_token=ABnnr5LZJi6LYFCHRIR9LnDk6i9kVb8g-ItRbWgLZz_tA=&xsec_source=pc_user',
  design06:
    'https://www.xiaohongshu.com/explore/6429598f00000000130062ef?xsec_token=AByimcxHy8d_Y4-1__cnklWE52hJfMv-hpFY5Wg28urNs=&xsec_source=pc_user',
  design07:
    'https://www.xiaohongshu.com/explore/66377350000000001e03962d?xsec_token=AB5rPzBVmp_WO3WjEp3YGI0Yh9CcpEfOKyNmXJID6_t08=&xsec_source=pc_user',
  design08:
    'https://www.xiaohongshu.com/explore/68e8e058000000003018842?xsec_token=ABKnFYB0A_WTp-LmeNgrQlkanRuFDkEdrqdPYHqWncUNY=&xsec_source=pc_user',
  design09:
    'https://www.xiaohongshu.com/explore/67f2ff6d000000001d0245a2?xsec_token=ABzKF6KZrnmANK6cQVcKZIQXtJdrOBP3gSS_Zq8N3ipB8=&xsec_source=pc_user',
  design10:
    'https://www.xiaohongshu.com/explore/6a002b20000000006022692?xsec_token=ABZ6QNdPCoP_3YakXaf24812e7EyRvVj65724hotX7kb8=&xsec_source=pc_user',
  design11:
    'https://www.xiaohongshu.com/explore/684e230b000000002101a4df?xsec_token=ABSYHQqkTSB6ptAREayTPtwzG96iqPfSdjzlpGbHIKoHM=&xsec_source=pc_user'
};

const modelLinks = {
  model01:
    'https://www.liblib.art/modelinfo/9dbb2bccaf34453baf845b1b5698ea07?from=personal_page&versionUuid=f44d57b4578c43b2966bc78717882319',
  model02:
    'https://www.liblib.art/modelinfo/fe517b90107c455ca03b95f49bc7eb96?mine=1&from=personal_page&versionUuid=e1c594686ee54b208ebb69ed0a4306ff',
  model03:
    'https://www.liblib.art/modelinfo/94bce353f8374e99bab800a251bd5f27?from=personal_page&versionUuid=e8ad1dd4eeca4fbfa8c88916ed37d5a2',
  model04:
    'https://www.liblib.art/modelinfo/6dc49211a52d4738adae2dada5bf4bd1?mine=1&from=personal_page&versionUuid=1e4ec34b63674f0daa9f376861593e38',
  model05:
    'https://www.liblib.art/modelinfo/7357f52e25cb4358bfd1899bb1699def?from=personal_page&versionUuid=72b47ce8739244908d78339c777bb4cb',
  model06: 'https://www.liblib.art/imageinfo/8a2ac2ba225f463a969229563a2efb83?mine=1',
  model07:
    'https://www.liblib.art/modelinfo/493d8a1eb1f445238e07fe404f9baee2?mine=1&from=personal_page&versionUuid=66299a79ff4a4f718b4868ec8716974c',
  model08: 'https://www.liblib.art/imageinfo/8a2ac2ba225f463a969229563a2efb83?mine=1',
  model09:
    'https://www.liblib.art/modelinfo/6977e2edfd344c7a955b9e6831496852?from=personal_page&versionUuid=a973ab1e7bce4926b99dc7cbb9aacb96',
  model10:
    'https://www.liblib.art/modelinfo/bd37d43cbe3a4e8694d87da3c6fdaae4?mine=1&from=personal_page&versionUuid=8e19d82c6c3c4c0bbebb44eec18a5af5',
  model11:
    'https://www.liblib.art/modelinfo/d1856a2a7b1c4be1bd12c94490609d9a?mine=1&from=personal_page&versionUuid=afcb97af62c34abda3b265a28f2bebba'
};

const modelGalleryItems = [
  { image: '/ai-models/model-01.webp', text: 'Qwen Image', url: modelLinks.model01 },
  { image: '/ai-models/model-02.webp', text: 'Supercoolvision V1', url: modelLinks.model02 },
  { image: '/ai-models/model-03.webp', text: '半透明材质', url: modelLinks.model03 },
  { image: '/ai-models/model-04.webp', text: '利益点图标', url: modelLinks.model04 },
  { image: '/ai-models/model-05.webp', text: '粉色图标 Lora', url: modelLinks.model05 },
  { image: '/ai-models/model-06.webp', text: '营销视觉', url: modelLinks.model06 },
  { image: '/ai-models/model-07.webp', text: '门店建筑模型', url: modelLinks.model07 },
  { image: '/ai-models/model-08.webp', text: '潮酷 Lora 模型', url: modelLinks.model08 },
  { image: '/ai-models/model-09.webp', text: '潮酷草模型', url: modelLinks.model09 },
  { image: '/ai-models/model-10.webp', text: '个性 IP 模型', url: modelLinks.model10 },
  { image: '/ai-models/model-11.webp', text: '勋章类模型', url: modelLinks.model11 }
];

const designInfoItems = [
  {
    image: '/design-info/design-01.jpg',
    title: 'Qwen Image',
    subtitle: '3D运营视觉专题',
    handle: '@qwen',
    borderColor: '#C8FF2D',
    gradient: 'linear-gradient(145deg, #C8FF2D, #F9A95B 42%, #07100B)',
    url: infoLinks.design01
  },
  {
    image: '/design-info/design-02.jpg',
    title: '潮酷视觉',
    subtitle: 'Supercoolvision V1',
    handle: '@vision',
    borderColor: '#F04438',
    gradient: 'linear-gradient(145deg, #F04438, #8B1E16 46%, #050606)',
    url: infoLinks.design02
  },
  {
    image: '/design-info/design-03.jpg',
    title: '半透明材质',
    subtitle: '3D材质视觉',
    handle: '@material',
    borderColor: '#5B5CFF',
    gradient: 'linear-gradient(145deg, #5B5CFF, #14122F 48%, #02030A)',
    url: infoLinks.design03
  },
  {
    image: '/design-info/design-04.jpg',
    title: '利益点图标',
    subtitle: '营销图标模型',
    handle: '@icon',
    borderColor: '#FF7A1A',
    gradient: 'linear-gradient(145deg, #FF7A1A, #7A3E22 48%, #050505)',
    url: infoLinks.design04
  },
  {
    image: '/design-info/design-05.jpg',
    title: '粉色图标 Lora',
    subtitle: '运营物料方向',
    handle: '@pink',
    borderColor: '#50C878',
    gradient: 'linear-gradient(145deg, #50C878, #A7E37B 42%, #071207)',
    url: infoLinks.design05
  },
  {
    image: '/design-info/design-06.jpg',
    title: '营销视觉',
    subtitle: '抖音运营视觉',
    handle: '@marketing',
    borderColor: '#5BBDF5',
    gradient: 'linear-gradient(145deg, #5BBDF5, #2C9DD8 42%, #061225)',
    url: infoLinks.design06
  },
  {
    image: '/design-info/design-07.jpg',
    title: '门店建筑',
    subtitle: '建筑模型方向',
    handle: '@store',
    borderColor: '#FFD21F',
    gradient: 'linear-gradient(145deg, #FFD21F, #F59E0B 42%, #063B3D)',
    url: infoLinks.design07
  },
  {
    image: '/design-info/design-08.jpg',
    title: '潮酷 Lora',
    subtitle: 'IP形象模型',
    handle: '@lora',
    borderColor: '#9FB39C',
    gradient: 'linear-gradient(145deg, #9FB39C, #C8D3C4 42%, #0A0D0B)',
    url: infoLinks.design08
  },
  {
    image: '/design-info/design-09.jpg',
    title: '潮酷草模型',
    subtitle: '角色穿搭视觉',
    handle: '@style',
    borderColor: '#9CA3AF',
    gradient: 'linear-gradient(145deg, #9CA3AF, #2C3444 45%, #050505)',
    url: infoLinks.design09
  },
  {
    image: '/design-info/design-10.jpg',
    title: '个性 IP',
    subtitle: '头像与人物资产',
    handle: '@ip',
    borderColor: '#38BDF8',
    gradient: 'linear-gradient(145deg, #38BDF8, #2563EB 48%, #06122B)',
    url: infoLinks.design10
  },
  {
    image: '/design-info/design-11.jpg',
    title: '勋章类模型',
    subtitle: '视觉徽章系统',
    handle: '@badge',
    borderColor: '#C7FF1A',
    gradient: 'linear-gradient(145deg, #C7FF1A, #9F5BFF 52%, #09091A)',
    url: infoLinks.design11
  },
  {
    title: '点击查看更多',
    more: true,
    borderColor: '#FFFFFF',
    gradient: 'linear-gradient(145deg, rgba(65, 59, 246, 0.88), rgba(5, 5, 14, 0.94))',
    url: '#models'
  }
];

const workflowItems = [
  {
    image: '/design-info/design-06.jpg',
    title: '营销主视觉',
    subtitle: '传播画面设计',
    handle: '@poster',
    borderColor: '#5BBDF5',
    gradient: 'linear-gradient(145deg, #5BBDF5, #2C9DD8 42%, #061225)',
    url: infoLinks.design06
  },
  {
    image: '/design-info/design-11.jpg',
    title: '徽章系统',
    subtitle: '品牌识别组件',
    handle: '@badge',
    borderColor: '#C7FF1A',
    gradient: 'linear-gradient(145deg, #C7FF1A, #9F5BFF 52%, #09091A)',
    url: infoLinks.design11
  },
  {
    image: '/design-info/design-03.jpg',
    title: '配色方案',
    subtitle: '色彩系统搭建',
    handle: '@color',
    borderColor: '#5B5CFF',
    gradient: 'linear-gradient(145deg, #5B5CFF, #14122F 48%, #02030A)',
    url: infoLinks.design03
  },
  {
    image: '/design-info/design-04.jpg',
    title: '角色设定',
    subtitle: 'IP形象方向',
    handle: '@ip',
    borderColor: '#FF7A1A',
    gradient: 'linear-gradient(145deg, #FF7A1A, #7A3E22 48%, #050505)',
    url: infoLinks.design04
  },
  {
    image: '/design-info/design-05.jpg',
    title: '图标物料',
    subtitle: '运营组件资产',
    handle: '@asset',
    borderColor: '#50C878',
    gradient: 'linear-gradient(145deg, #50C878, #A7E37B 42%, #071207)',
    url: infoLinks.design05
  },
  {
    image: '/design-info/design-01.jpg',
    title: '内容策划',
    subtitle: '主题与结构拆解',
    handle: '@plan',
    borderColor: '#C8FF2D',
    gradient: 'linear-gradient(145deg, #C8FF2D, #F9A95B 42%, #07100B)',
    url: infoLinks.design01
  },
  {
    image: '/design-info/design-07.jpg',
    title: '空间建模',
    subtitle: '场景与建筑表现',
    handle: '@space',
    borderColor: '#FFD21F',
    gradient: 'linear-gradient(145deg, #FFD21F, #F59E0B 42%, #063B3D)',
    url: infoLinks.design07
  },
  {
    image: '/design-info/design-08.jpg',
    title: '模型训练',
    subtitle: 'Lora能力沉淀',
    handle: '@lora',
    borderColor: '#9FB39C',
    gradient: 'linear-gradient(145deg, #9FB39C, #C8D3C4 42%, #0A0D0B)',
    url: infoLinks.design08
  },
  {
    image: '/design-info/design-09.jpg',
    title: '风格验证',
    subtitle: '多样化生成测试',
    handle: '@style',
    borderColor: '#9CA3AF',
    gradient: 'linear-gradient(145deg, #9CA3AF, #2C3444 45%, #050505)',
    url: infoLinks.design09
  },
  {
    image: '/design-info/design-10.jpg',
    title: '人物资产',
    subtitle: '头像与形象方向',
    handle: '@people',
    borderColor: '#38BDF8',
    gradient: 'linear-gradient(145deg, #38BDF8, #2563EB 48%, #06122B)',
    url: infoLinks.design10
  },
  {
    image: '/design-info/design-02.jpg',
    title: '视觉看板',
    subtitle: '风格参考整理',
    handle: '@moodboard',
    borderColor: '#F04438',
    gradient: 'linear-gradient(145deg, #F04438, #8B1E16 46%, #050606)',
    url: infoLinks.design02
  },
  {
    image: '/ai-models/model-01.webp',
    title: '图片生成',
    subtitle: 'Qwen Image 流程',
    handle: '@qwen',
    borderColor: '#FF2DAA',
    gradient: 'linear-gradient(145deg, #FF2DAA, #2277FF 52%, #080214)',
    url: modelLinks.model01
  },
  {
    image: '/ai-models/model-02.webp',
    title: '视觉模型',
    subtitle: '潮酷视觉系列',
    handle: '@vision',
    borderColor: '#73F000',
    gradient: 'linear-gradient(145deg, #73F000, #27D3E8 48%, #06100C)',
    url: modelLinks.model02
  },
  {
    image: '/ai-models/model-03.webp',
    title: '材质实验',
    subtitle: '半透明质感',
    handle: '@material',
    borderColor: '#C8FF2D',
    gradient: 'linear-gradient(145deg, #C8FF2D, #F6B55D 52%, #06100B)',
    url: modelLinks.model03
  },
  {
    image: '/ai-models/model-04.webp',
    title: '利益点图标',
    subtitle: '营销转化素材',
    handle: '@icon',
    borderColor: '#FF3A2E',
    gradient: 'linear-gradient(145deg, #FF3A2E, #F5C04D 52%, #120606)',
    url: modelLinks.model04
  },
  {
    image: '/ai-models/model-05.webp',
    title: '交付整理',
    subtitle: '归档与复盘',
    handle: '@delivery',
    borderColor: '#FF2FA3',
    gradient: 'linear-gradient(145deg, #FF2FA3, #F7B0C8 50%, #11050B)',
    url: modelLinks.model05
  }
];

export default function App() {
  const [view, setView] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return views.includes(hash) ? hash : 'home';
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setView(views.includes(hash) ? hash : 'home');
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goToView = (event, nextView) => {
    event.preventDefault();
    setView(nextView);
    window.history.replaceState(null, '', `#${nextView}`);
  };

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <>
      <div className="silk-layer" aria-hidden="true">
        <Silk speed={10} scale={1} color="#413bf6" noiseIntensity={1.5} rotation={0} />
      </div>

      <header className="top-nav">
        <a className="brand" href="#home" onClick={(event) => goToView(event, 'home')}>
          <img className="brand-logo" src="/site-logo.png" alt="" aria-hidden="true" />
          <span>阿赞的网站</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a className={`nav-link ${view === 'home' ? 'active' : ''}`} href="#home" onClick={(event) => goToView(event, 'home')}>
            首页
          </a>
          <a
            className={`nav-link ${view === 'models' ? 'active' : ''}`}
            href="#models"
            onClick={(event) => goToView(event, 'models')}
          >
            AI模型
          </a>
          <a
            className={`nav-link ${view === 'workflow' ? 'active' : ''}`}
            href="#workflow"
            onClick={(event) => goToView(event, 'workflow')}
          >
            设计资讯
          </a>
          <a
            className={`nav-link ${view === 'consulting' ? 'active' : ''}`}
            href="#consulting"
            onClick={(event) => goToView(event, 'consulting')}
          >
            工作流
          </a>
        </nav>
      </header>

      <main className="page">
        <section className="content split-demo view" hidden={view !== 'home'}>
          <SplitText
            text="Hello, you!"
            className="split-text-demo"
            delay={50}
            duration={1.25}
            from={{ opacity: 0, y: 40 }}
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </section>

        <section className="models-view view" hidden={view !== 'models'}>
          <div className="models-header">
            <div>
              <p className="model-kicker">AI Models</p>
              <h2 className="models-title">Lora模型训练</h2>
            </div>
            <p className="models-copy">共包含11个Lora模型，总体使用量为106W+，有3d图标、IP人物、摄影方向等，用户使用返图3000张。</p>
          </div>
          <div className="gallery-frame">
            <CircularGallery
              items={modelGalleryItems}
              bend={1}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.05}
            />
          </div>
        </section>

        <section className="workflow-view view" hidden={view !== 'workflow'}>
          <div className="workflow-panel">
            <WorkflowChromaGrid items={workflowItems} radius={300} columns={4} damping={0.45} />
          </div>
        </section>

        <section className="chroma-view view" hidden={view !== 'consulting'}>
          <div className="chroma-panel">
            <ChromaGrid items={designInfoItems} radius={300} columns={4} damping={0.45} fadeOut={0.6} />
          </div>
        </section>
      </main>
    </>
  );
}
