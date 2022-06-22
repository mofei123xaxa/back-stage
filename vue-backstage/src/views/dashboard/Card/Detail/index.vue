<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <svg
        t="1653398106685"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2960"
        width="16"
        height="16"
      >
        <path
          d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m0 544a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m0-362.666666a42.666667 42.666667 0 0 0-42.666667 42.666666v234.666667a42.666667 42.666667 0 1 0 85.333334 0V309.333333a42.666667 42.666667 0 0 0-42.666667-42.666666z"
          p-id="2961"
          fill="#515151"
        ></path>
      </svg>
    </div>
    <div class="card-content">
      <span>{{count}}</span>
    </div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer" ></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props:['title','count']
};
</script>

<style  >
.card-header {
  display: flex;
  justify-content: space-between;
}
.card-charts {
  height: 40px;
  font-size: 13px;
  /* padding: 10px 0; */
}
.card-footer {
  border-top: 1px solid black;
  padding: 15px 0;
}
.card-content {
  padding: 5px 0;
  font-size: 30px;
}
</style>