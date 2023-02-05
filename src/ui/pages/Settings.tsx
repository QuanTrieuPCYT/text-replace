import { constants as Constants, NavigationNative, React, stylesheet as StyleSheet } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms, General } from "@vendetta/ui/components";
import { Rule } from "../../def";
import AddRuleButton from "../components/AddRuleButton";
import EditRule from "./EditRule";

// Components
const { ScrollView, TextInput } = General;
const { FormRow, FormSection, FormArrow, FormDivider } = Forms;

const styles = StyleSheet.createThemedStyleSheet({
	input: {
		fontSize: 16,
		fontFamily: Constants.Fonts.PRIMARY_MEDIUM,
		color: StyleSheet.ThemeColorMap.TEXT_NORMAL
	},
	placeholder: {
		color: StyleSheet.ThemeColorMap.INPUT_PLACEHOLDER_TEXT
	}
})

export default function Settings() {
	const [newRule, setNewRule] = React.useState("")
	let rules = storage.rules as Rule[];
	useProxy(storage)

	const navigation = NavigationNative.useNavigation();

	const addRuleCallback = () => {
		if (newRule) {
			rules.push({
				name: newRule,
				match: "",
				replace: ""
			})
			setNewRule("")

			navigation.push("VendettaCustomPage", {
				title: "Editing Rule",
				render: () => <EditRule ruleIndex={rules.length - 1} />
			})
		}
	}

	return (
		<ScrollView>
			<FormSection title="Rules">
				{rules.map((rule, index) => <>
					<FormRow
						label={rule.name}
						trailing={<FormArrow />}
						onPress={() => navigation.push("VendettaCustomPage", {
							title: "Editing Rule",
							render: () => <EditRule ruleIndex={index} />
						})}
					/>
					<FormDivider />
				</>)}
				<FormRow
					label={<TextInput
						value={newRule}
						onChangeText={setNewRule}
						placeholder="New rule"
						placeholderTextColor={styles.placeholder.color}
						selectionColor={Constants.Colors.PRIMARY_DARK_100}
						onSubmitEditing={addRuleCallback}
						returnKeyType="done"
						style={styles.input}
					/>}
					trailing={<AddRuleButton onPress={addRuleCallback} />}
				/>
			</FormSection>
		</ScrollView>
	);
};