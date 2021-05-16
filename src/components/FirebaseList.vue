<template>
  <div>
    <h1>System List</h1>
    <ul>
      <li
        v-for="item in testCollection"
        :key="item.key"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'FBList',
  data() {
    return {
      testCollection: [],
    };
  },
  mounted() {
    const db = this.$firebase.firestore();
    db
      .collection('test')
      .get()
      .then(snap => {
        const testCollection = [];
        snap.forEach(doc => {
          testCollection.push({ [doc.id]: doc.data() });
        });
        this.testCollection = testCollection;
      });
  },
};
</script>