<template>
  <div class="ls-sub_menu">
    <template v-if="!menuData.children">
      <el-menu-item :index="resolvePath(menuData.path)" v-bind="menuData.props">
        <i :class="menuData.icon" />
        <span slot="title">{{ menuData.name }}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <el-submenu :index="resolvePath(menuData.path)" v-bind="menuData.props">
        <template slot="title">
          <i :class="menuData.icon" />
          <span slot="title">{{ menuData.name }}</span>
        </template>
        <ls-sub-menu
          v-for="item in menuData.children"
          :key="item.path"
          :base-path="resolvePath(menuData.path)"
          :menu-data="item"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'LsSubMenu',
  props: {
    menuData: {
      type: Object,
      default() {
        return {}
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
