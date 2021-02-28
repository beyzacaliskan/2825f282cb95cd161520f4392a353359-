<template>
   <section class="nav">
    <div class="nav--left">
      <p class="title">Otel</p>
      <p>Rezervasyon Sistemi</p>
    </div>

    <div class="nav--right">
      <button class="reservation-btn">Yeni Rezervasyon Yap</button>
    </div>
  </section>
</template>

<style lang="scss">
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.nav {
  background: #233A62;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 56px;
  height: 150px;

  &--left {
    color: white;
    font-size: 24px;

    .title {
      font-size: 40px;
      font-weight: bold;
    }
  }

  &--right {
    .reservation-btn {
      height: 56px;
      font-size: 20px;
      padding: 0 10px;
    }
  }
}

</style>