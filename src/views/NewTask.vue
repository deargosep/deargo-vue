<template>
  <div>
    <v-form>
      <v-text-field
        placeholder="Name of the task"
        label="Name of the task"
      />
      <v-text-field
        placeholder="Description of the task"
        small
        label="Description of the task"
      />
      <v-btn
        block
        @click="submit"
      >
        Create
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default{
    name: 'NewTask',
    methods: {
    submit() {
        this.$router.go(-1)
    }
    }
}
</script>