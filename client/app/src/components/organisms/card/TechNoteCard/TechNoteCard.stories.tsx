import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./TechNoteCard";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Organisms/Card/TechNoteCard",
  component: Component,
  args: {
    iconKey: "RESEARCH",
    title: "Sample",
    tags: ["Sample tag1", "Sample tag2", "Sample tag3"],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const LongTitle = Template.bind({});
LongTitle.args = {
  title: "Looooooooooooooooooooooooooooooooong title",
};

export const LongTags = Template.bind({});
LongTags.args = {
  tags: [
    "Sample tag1",
    "Sample tag2",
    "Sample tag3",
    "Sample tag4",
    "Sample tag5",
    "Sample tag6",
    "Sample tag7 Sample tag7 Sample tag7 Sample tag7 Sample tag7",
  ],
};
