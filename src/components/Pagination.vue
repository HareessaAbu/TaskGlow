<template>
    <ul class="pagination">
        <li class="pagination-item">
            <button
                class="btn-control"
                type="button"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
        </li>

        <!-- Visible Buttons Start -->
        <li class="pagination-item" v-if="!isInFirstRange">
            <button
                type="button"
                @click="onClickFirstPage"
                :disabled="isInFirstPage"
            >
                1
            </button>
        </li>

        <font-awesome-icon class="ellipsis" v-if="!isInFirstRange" :icon="['fas', 'ellipsis']"/>

        <li
            v-for="page in pages"
            class="pagination-item"
            :key="page.name"
        >
            <button
                type="button"
                @click="onClickPage(page.name)"
                :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }"
            >
                {{ page.name }}
            </button>
        </li>

        <font-awesome-icon v-if="!isInLastRange" class="ellipsis" :icon="['fas', 'ellipsis']"/>

        <li class="pagination-item" v-if="!isInLastRange">
            <button
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage"
            >
                {{ totalPages }}
            </button>
        </li>

        <!-- Visible Buttons End -->

        <li class="pagination-item">
            <button
                class="btn-control"
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage"
            >
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage === 1 || this.totalPages < this.maxVisibleButtons) {
                return 1;
            }
            // When on the last page
            if (this.currentPage === this.totalPages && this.totalPages > this.maxVisibleButtons) {
                return this.totalPages - (this.maxVisibleButtons - 1);
            }
            // When inbetween
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            let i = (this.isInFirstRange) ? 1 : this.startPage

            let maxNum = (this.isInLastRange) ? this.totalPages : this.startPage + this.maxVisibleButtons - 1

            for (i; i <= Math.min(maxNum, this.totalPages); i++) {

                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });

            }

            return range;
        },
        forthLastPage() {
            return this.currentPage === (this.totalPages - 3)
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
        isInFirstRange() {
            return this.currentPage <= this.maxVisibleButtons + 1;
        },
        isInLastRange() {
            return this.currentPage > (this.totalPages - this.maxVisibleButtons - 1);
        }
    },
    methods: {
        onClickFirstPage() {
            this.$emit('page-changed', 1);
        },
        onClickPreviousPage() {
            this.$emit('page-changed', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('page-changed', page);
        },
        onClickNextPage() {
            this.$emit('page-changed', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('page-changed', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        }
    },
    components: { FontAwesomeIcon }
}
</script>