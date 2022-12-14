<template>
  <div class="about">
    <h1>This is an about page <p>{{$serverSideProps.user}}</p></h1>
  </div>
</template>

<script>

export async function getServerSideProps ({ ky }) {
  return {
    user: await ky('api/images').json()
  }
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
