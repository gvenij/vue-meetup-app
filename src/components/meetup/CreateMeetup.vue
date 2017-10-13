<template>
    <v-container>
        <v-layout>
            <v-flex sm6 offset-sm3 xs12>
                <h4 class="primary--text">Create a new meetup</h4>

            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
            <v-flex sm6 offset-sm3 xs12>
                <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
                >
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex sm6 offset-sm3 xs12>
                <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
                >
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex sm6 offset-sm3 xs12>
                <v-text-field
                name="imageUrl"
                label="Image URL"
                id="imageUrl"
                v-model="imageUrl"
                required
                >
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex sm6 offset-sm3 xs12>
            <img :src="imageUrl" alt="" height="200">
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex sm6 offset-sm3 xs12>
                <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line="true"
                v-model="description"
                required
                >
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex sm6 offset-sm3 xs12>
                <v-btn class="primary" type="submit" :disabled="!formIsValid">Create meetup</v-btn>
            </v-flex>
        </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: ''
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
    }
  },
   methods: {
       onCreateMeetup () {
            const meetupData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                 date: new Date();
            }
           this.$store.dispatch('CreateMeetup', meetupData)
       }
   }
}

</script>
