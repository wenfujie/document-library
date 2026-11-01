## transform scale 方案

PC 正常按照 `1920 * 1080` 尺寸来开发，然后通过 transform scale 来缩放页面，从而实现 PC 适配。

代码参考

```ts
// 类型及依赖代码
type ScaleType = "w" | "h" | "auto";
interface SetElScaleParam {
  elId: string;
  transform?: string;
  scaleType?: ScaleType;
}
const debounce = (fn: Function, time: number) => {
  let interval: NodeJS.Timeout;

  return () => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setTimeout(() => {
      fn();
    }, time);
  };
};
```

```ts
// 实现代码封装

function useSetElScale(configs: SetElScaleParam[]) {
  // 获取放大缩小比例
  function getScale(scaleType: ScaleType = "auto") {
    // 宽度不能包含滚动条，否则出现横向滚动条
    const w = document.body.clientWidth / 1920;
    const h = window.innerHeight / 1080;
    if (scaleType === "w") {
      return w;
    } else if (scaleType === "h") {
      return h;
    } else {
      return w < h ? w : h;
    }
  }

  const setElsScale = () => {
    configs.map(({ elId, transform, scaleType }) => {
      const el = document.getElementById(elId);
      el &&
        (el.style.transform = `scale(${getScale(scaleType)}) ${
          transform || ""
        }`);
    });
    // 此处为 vue api，方便监听适配渲染完毕
    return nextTick();
  };

  const debounceSetElsScale = debounce(setElsScale, 100);

  const listenPageResize = () => {
    window.addEventListener("resize", debounceSetElsScale);
  };
  const removeListenPageResize = () => {
    window.removeEventListener("resize", debounceSetElsScale);
  };

  // 取消适配
  const cancelElsScale = () => {
    removeListenPageResize();
    configs.map(({ elId, transform }) => {
      const el = document.getElementById(elId);
      el && (el.style.transform = `scale(1) ${transform || ""}`);
    });
  };

  return { setElsScale, getScale, cancelElsScale, listenPageResize };
}
```

```ts
<script setup lang="ts">
// use
const visiblePage = ref(false); // 控制页面显示
const { setElsScale, listenPageResize } = useSetElScale([
  {
  elId: 'app',
    // 页面级适配以宽度比例为准，才能保证宽度满屏
    // 若以高度为准会导致右侧留白
    scaleType: "w",
  },
]);

onMounted(() => {
  await setElsScale().then(() => {
    // 避免展示页面缩放过程，渲染完成后再显示页面
    visiblePage.value = true;
  });
  listenPageResize();
});
</script>

<style lang="less" scoped>
#app {
  width: "1920px";
  height: "1080px";
  // 缩放对照坐标
  transformOrigin: "0 0";
  // js 控制缩放大小
  // transform: scale(1);
}
</style>
```
