<template>
  <div class="main-container">
    <GlobalNav/>
    <Header/>

    <div :class="{ 'main-content-wrap': true, 'has-sidebar': sideBarVisible }">
      <div class="main-content">
        <Nuxt/>
      </div>
      <Sidebar :visible="sideBarVisible" class="sidebar" @show-sidebar="sideBarVisible=true" @close-sidebar="sideBarVisible=false"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import GlobalNav from '@/components/GlobalNav.vue'
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
import PersonaCard from '~/components/PersonaCard.vue'

@Component({
  components: {
    PersonaCard,
    Sidebar,
    Header,
    GlobalNav
  }
})
export default class DefaultLayout extends Vue {
  private sideBarVisible: boolean = true
}
</script>

<style lang="scss" scoped>
.main-container {
  background-color: #646E6E;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-content-wrap {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: available;
  overflow-y: scroll;
  &.has-sidebar {
    .main-content {
      margin-right: 390px;
    }
  }
}

.main-content {
  display: flex;
  padding: 45px 110px;
  flex: 1;
  margin-right: 0;
  transition: margin-right 200ms ease-in-out;
}

.sidebar {
  flex-shrink: 0;
  margin-top: 16px;
  position: fixed;
  right: 0;
  height: 100%;
}
</style>
