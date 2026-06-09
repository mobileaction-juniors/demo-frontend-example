<script setup>
import {
    MaButton,
    MaTextarea,
} from "@mobileaction/action-kit";
import { generateKeyword } from "./functions";
import { ref } from "vue";

const text = ref("");
const keywords = ref([]);
const error = ref("");

const showDropdown = ref(false);
const ngramOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const selectedNgrams = ref([1]);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const resetKeywords = () => {
    keywords.value = [];
};

const validateText = () => {
    if (text.value.trim() === "") {
        error.value = "Please enter text first.";
        resetKeywords();
        return false;
    }

    error.value = "";
    return true;
};

const submit = () => {
    if (!validateText()) return;

    keywords.value = generateKeyword(text.value, selectedNgrams.value);
};
</script>

<template>
    <div class="ma-keywords-generator">
        <h1 class="title">Keyword Generator</h1>

        <div class="controls">
            <div class="input-section">
                <MaTextarea
                    id="keyword-generator-text"
                    v-model="text"
                    placeholder="Enter text"
                    :rows="6"
                    :has-error="Boolean(error)"
                />

                <p v-if="error" class="error-message">
                    {{ error }}
                </p>
            </div>

            <div class="dropdown">
                <button
                    type="button"
                    class="dropdown-button"
                    @click="toggleDropdown"
                >
                    Select N-Grams
                </button>

                <div v-if="showDropdown" class="dropdown-menu">
                    <label
                        v-for="option in ngramOptions"
                        :key="option"
                        class="dropdown-item"
                    >
                        <input
                            type="checkbox"
                            :value="option"
                            v-model="selectedNgrams"
                        />

                        {{ option }}-Gram
                    </label>
                </div>
            </div>

            <ma-button
                class="submit-button"
                variant="filled"
                type="button"
                @click="submit"
            >
                Submit
            </ma-button>
        </div>

        <div class="keyword-groups">
            <div
                class="keyword-group"
                v-for="group in keywords"
                :key="group.ngram"
                v-show="group.keywords.length > 0"
            >
                <h3>{{ group.ngram }}-Gram</h3>

                <div class="group-items">
                    <span
                        v-for="keyword in group.keywords"
                        :key="keyword"
                        class="keyword-badge"
                    >
                        {{ keyword }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ma-keywords-generator {
    min-height: 100vh;
    padding: 3rem 4rem;
    font-family: Inter, Arial, sans-serif;
    color: #0f172a;
}

.title {
    margin-bottom: 2.5rem;
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -1.2px;
}

/* Top control panel */
.controls {
    display: grid;
    grid-template-columns: 1fr 220px 140px;
    gap: 18px;
    align-items: start;

    width: 100%;
    max-width: 1200px;
    margin-bottom: 3.5rem;
    padding: 1.25rem;

    background: rgba(255, 255, 255, 0.78);
    border: 1px solid #e2e8f0;
    border-radius: 22px;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
}

/* Text area */
.input-section {
    display: flex;
    flex-direction: column;
}

#keyword-generator-text {
    width: 100%;
    min-height: 8rem;
}

.error-message {
    min-height: 20px;
    margin: 8px 0 0;
    color: #ef4444;
    font-size: 14px;
    font-weight: 500;
}

/* Dropdown */
.dropdown {
    position: relative;
}

.dropdown-button,
.submit-button {
    width: 100%;
    height: 42px;
    border-radius: 12px;
}

.dropdown-button {
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #334155;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
}

.dropdown-button:hover {
    border-color: #6366f1;
    color: #4338ca;
    background: #f8fafc;
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 10;

    min-width: 140px;
    padding: 8px;

    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    box-shadow: 0 18px 38px rgba(15, 23, 42, 0.16);
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 9px 10px;
    border-radius: 10px;

    cursor: pointer;
    color: #334155;
    font-size: 14px;
    font-weight: 600;
}

.dropdown-item:hover {
    background: #eef2ff;
    color: #4338ca;
}

.dropdown-item input {
    margin: 0;
    accent-color: #6366f1;
}

/* Keyword cards */
.keyword-groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 22px;
}

.keyword-group {
    padding: 1.5rem;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
}

.keyword-group h3 {
    margin-bottom: 1rem;
    color: #1e293b;
    font-size: 22px;
    font-weight: 900;
}

.group-items {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
}

/* Individual keyword badges */
.keyword-badge {
    display: inline-flex;
    align-items: center;

    padding: 8px 13px;
    border-radius: 999px;

    background: #eef2ff;
    color: #3730a3;
    border: 1px solid #c7d2fe;

    font-size: 14px;
    font-weight: 700;
    line-height: 1;
}

/* Responsive */
@media (max-width: 980px) {
    .ma-keywords-generator {
        padding: 1.5rem;
    }

    .title {
        font-size: 38px;
    }

    .controls {
        grid-template-columns: 1fr;
    }

    .dropdown-menu {
        position: static;
        margin-top: 8px;
    }

    .keyword-groups {
        grid-template-columns: 1fr;
    }
}
</style>