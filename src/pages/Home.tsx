import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform, FlatList, StatusBar } from "react-native";
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkills([...mySkills, data]);
    setNewSkill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(mySkills.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if( currentHour < 12 ) {
      setGreetings('Good Morning');
    } else if ( currentHour >= 12 && currentHour < 18 ) {
      setGreetings('Good Afternoon');
    } else {
      setGreetings('Good Evening');
    }
  }, [])

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Welcome, Filipe</Text>
      <Text style={styles.greetings}>
        {greetings}
      </Text>
      <TextInput 
        style={styles.input} 
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        value={newSkill}
      />

      <Button onPress={handleAddNewSkill} title="Add" />

      <Text style={[styles.title, {marginVertical: 50 }]} >
        My Skills
      </Text>
      <FlatList 
        data={mySkills} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => <SkillCard 
                                    skill={item.name} 
                                    onPress={() => handleRemoveSkill(item.id)}
                                  />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 70,

  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff',
  },
});


